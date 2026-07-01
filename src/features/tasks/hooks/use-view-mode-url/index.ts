import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type ViewMode = 'list' | 'kanban';

const isViewMode = (value: string | null): value is ViewMode =>
  value === 'list' || value === 'kanban';

export const useViewModeUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const viewMode = useMemo<ViewMode>(() => {
    const tabs = searchParams.get('tabs');
    return isViewMode(tabs) ? tabs : 'list';
  }, [searchParams]);

  useEffect(() => {
    const tabs = searchParams.get('tabs');
    if (!isViewMode(tabs)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('tabs', 'list');
          return next;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const setViewMode = useCallback(
    (mode: ViewMode) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('tabs', mode);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return { viewMode, setViewMode };
};
