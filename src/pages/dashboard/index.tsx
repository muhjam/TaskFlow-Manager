import React, { useState } from 'react';
import { useAuthStore } from '../../features/auth/store';
import { useThemeStore } from '../../hooks/use-theme-store';
import { useTasks, useTaskMutations } from '../../features/tasks/hooks/use-tasks';
import { useTaskStore } from '../../features/tasks/store';
import { TaskList } from '../../features/tasks/components/task-list';
import { TaskBoard } from '../../features/tasks/components/task-board';
import { Button } from '../../components/ui/button';
import { Input, Select, TextArea, DatePicker, ButtonSelect } from '../../components/ui/input';
import { LogOut, Plus, Search, List as ListIcon, LayoutGrid, CheckCircle, Moon, Sun } from 'lucide-react';
import { Modal } from '../../components/ui/modal';
import { Tabs } from '../../components/ui/tabs';
import { cn } from '../../utils/cn';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();
  const { data: tasks = [], isLoading } = useTasks();
  const { createTask } = useTaskMutations();
  
  const { search, setSearch, viewMode, setViewMode, status, setStatus } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || task.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    createTask.mutate({
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'todo',
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
    });
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
    setIsAdding(false);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-6xl mx-auto px-ds-container py-ds-sm flex justify-between items-center">
          <div className="flex items-center gap-ds-sm">
            <CheckCircle className="h-6 w-6 text-primary fill-primary/10" />
            <h1 className="font-headline-md-mobile text-headline-md-mobile text-primary font-extrabold tracking-tight">TaskFlow Manager</h1>
          </div>
          <div className="flex items-center gap-ds-md">
            <div className="relative">
              <div 
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-fixed cursor-pointer transition-transform active:scale-95"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img 
                  className="w-full h-full object-cover" 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
                  alt="User profile" 
                />
              </div>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20">
                    <div className="bg-surface-container-lowest shadow-level2 rounded-ds-lg p-1.5 border border-outline-variant/30 min-w-[200px] animate-fade-in text-left">
                      <div className="px-4 py-3">
                        <p className="text-xs font-bold truncate text-on-surface">{user?.name}</p>
                        <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                      </div>
                      <hr className="my-1 border-outline-variant/10" />
                      
                      {/* Theme Toggle */}
                      <button 
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-4 py-3 text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium"
                      >
                        <div className="flex items-center gap-3">
                          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </div>
                        <div className={cn(
                          "w-8 h-4 rounded-full relative transition-colors duration-200",
                          theme === 'dark' ? "bg-primary" : "bg-outline-variant/30"
                        )}>
                          <div className={cn(
                            "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200",
                            theme === 'dark' ? "left-4.5" : "left-0.5"
                          )} />
                        </div>
                      </button>

                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/10 rounded-ds-md transition-colors font-bold"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-ds-container mt-[70px] flex-1 pb-24 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-ds-md mb-ds-lg">
          <div>
            <h2 className="text-display-lg text-on-surface mb-ds-xs">My Tasks</h2>
            <p className="text-body-md text-on-surface-variant font-medium">
              You have {tasks.filter(t => t.status !== 'done').length} tasks remaining.
            </p>
          </div>
          
          {/* View Selector Tabs */}
          <Tabs 
            value={viewMode}
            onChange={(val) => setViewMode(val as any)}
            options={[
              { label: 'List', value: 'list', icon: <ListIcon className="h-4 w-4" /> },
              { label: 'Kanban', value: 'kanban', icon: <LayoutGrid className="h-4 w-4" /> },
            ]}
            className="self-start md:self-auto"
          />
        </div>

        {/* Filters and Search (Secondary Row) */}
        <div className="flex flex-col md:flex-row gap-ds-md mb-ds-lg items-center">
          <Input 
            placeholder="Search tasks..."
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="flex-1"
          />
          <div className="flex items-center gap-ds-sm text-on-surface-variant w-full md:w-auto">
            <Select 
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'To Do', value: 'todo' },
                { label: 'In Progress', value: 'in-progress' },
                { label: 'Done', value: 'done' },
              ]}
              containerClassName="md:w-[150px]"
            />
          </div>
        </div>

        {/* Main Content Area */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="animate-fade-in">
            {viewMode === 'list' ? (
              <section className="space-y-ds-md">
                <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/5 mb-ds-md">
                  <h2 className="text-headline-sm text-on-surface font-bold">Active Tasks</h2>
                  <span className="bg-primary-container text-on-primary-container text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {filteredTasks.length}
                  </span>
                </div>
                <TaskList tasks={filteredTasks} />
              </section>
            ) : (
              <TaskBoard tasks={filteredTasks} />
            )}
          </div>
        )}

        {/* FAB - Fixed at bottom right */}
        <div className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none">
          <div className="max-w-6xl mx-auto px-ds-container flex justify-end">
            <button 
              onClick={() => setIsAdding(true)}
              className="pointer-events-auto w-12 h-12 bg-primary text-white rounded-full shadow-level2 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
              <Plus className="h-7 w-7 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      <Modal 
        isOpen={isAdding} 
        onClose={() => setIsAdding(false)} 
        title="Add New Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-ds-lg">
          {/* Task Name */}
          <Input
            label="Task Name"
            autoFocus
            placeholder="What needs to be done?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          
          {/* Description */}
          <TextArea
            label="Description"
            placeholder="Add more details..."
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            rows={3}
          />
          
          {/* Priority Selector */}
          <ButtonSelect
            label="Priority"
            value={newTaskPriority}
            onChange={(val) => setNewTaskPriority(val as any)}
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high', variant: 'error' },
            ]}
          />

          {/* Due Date */}
          <DatePicker
            label="Due Date"
            placeholder="Select date"
            value={newTaskDueDate}
            onChange={(date) => setNewTaskDueDate(date)}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-ds-md pt-ds-lg">
            <Button 
              type="submit" 
              className="flex-1 py-ds-md rounded-xl font-bold"
            >
              Create Task
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsAdding(false)}
              className="flex-1 py-ds-md rounded-xl font-bold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Atmospheric Background Blurs */}
      <div className="fixed top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[80px] -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary-container/5 rounded-full blur-[80px] -z-10"></div>
    </div>
  );
};
