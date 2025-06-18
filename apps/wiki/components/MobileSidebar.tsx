'use client';

import { bannerHeightAtom } from '@/lib/banner-atoms';
import { t } from '@/lib/i18n/client';
import type { DocItemForClient } from '@/service/directory-service-client';
import { useAtom } from 'jotai';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Link } from './progress';

interface MobileSidebarProps {
  navigationItems: DocItemForClient[];
  language: string;
}

const MobileNavItem = ({
  item,
  language,
  level = 0,
  currentPath,
  onItemClick,
}: {
  item: DocItemForClient;
  language: string;
  level?: number;
  currentPath: string;
  onItemClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // 构建完整的链接路径
  const fullPath = `/${language}/${item.path}`;

  // 检查当前路径是否匹配
  const isActive = currentPath === fullPath;

  // 如果当前项或其子项是活动的，则自动展开
  useEffect(() => {
    if (
      isActive ||
      (hasChildren &&
        item.children?.some((child) =>
          currentPath.startsWith(`/${language}/${child.path}`),
        ))
    ) {
      setIsOpen(true);
    }
  }, [currentPath, hasChildren, isActive, item.children, language]);

  return (
    <div className="mb-1">
      {hasChildren ? (
        <div>
          {/* 父级链接 */}
          <div className="flex items-center justify-between">
            <Link
              showSkeletonImmediately={true}
              href={fullPath}
              onClick={onItemClick}
              className={`
                flex-1 block py-2 px-3 rounded-lg text-sm transition-colors
                ${level === 0 ? 'font-medium text-base-content' : 'text-base-content/80'}
                ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-200'}
              `}
            >
              {item.name}
            </Link>
            {/* 展开/收起按钮 */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 ml-1 rounded-lg hover:bg-base-200 transition-colors"
              aria-label={isOpen ? '收起' : '展开'}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isOpen ? '' : '-rotate-90'}`}
              />
            </button>
          </div>
          {/* 子级内容 */}
          {isOpen && (
            <div
              className={`ml-${level > 0 ? 6 : 4} mt-1 space-y-1 border-l-2 border-base-300/50 pl-3`}
            >
              {item.children?.map((child) => (
                <MobileNavItem
                  key={child.path}
                  item={child}
                  language={language}
                  level={level + 1}
                  currentPath={currentPath}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          showSkeletonImmediately={true}
          href={fullPath}
          onClick={onItemClick}
          className={`
            block py-2 px-3 rounded-lg text-sm transition-colors
            ${level === 0 ? 'font-medium text-base-content' : 'text-base-content/80'}
            ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-200'}
          `}
        >
          {item.name}
        </Link>
      )}
    </div>
  );
};

export default function MobileSidebar({
  navigationItems,
  language,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const [bannerHeight] = useAtom(bannerHeightAtom);

  // 控制动画状态
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // 延迟隐藏，等待动画完成
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC键关闭侧边栏
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // 计算按钮的底部位置，如果有 banner 就在 banner 上方
  const buttonBottomPosition =
    bannerHeight > 0 ? `${bannerHeight + 24}px` : '24px';

  return (
    <>
      {/* 浮动按钮 - 直接显示为"目录"或"导航" */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-6 z-40 lg:hidden flex items-center space-x-2 px-4 py-3 rounded-full bg-primary text-primary-content shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
        style={{ bottom: buttonBottomPosition }}
        aria-label={t('docs', language)}
      >
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium">{t('navigation', language)}</span>
      </button>

      {/* 遮罩层和侧边栏 */}
      {isVisible && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* 遮罩层 */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-150 ease-in-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClose();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="关闭导航"
          />

          {/* 侧边栏内容 */}
          <div
            className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-base-100 shadow-2xl border-r border-base-300 transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-primary/5">
              <h2 className="text-lg font-semibold text-base-content flex items-center space-x-2">
                <Menu className="w-5 h-5 text-primary" />
                <span>{t('navigation', language)}</span>
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-base-300/50 transition-colors"
                aria-label="close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 导航内容 */}
            <div className="overflow-y-auto h-[calc(100vh-5rem)] p-4">
              <nav>
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <MobileNavItem
                      key={item.path}
                      item={item}
                      language={language}
                      currentPath={pathname}
                      onItemClick={handleItemClick}
                    />
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
