'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from './progress';

import { isElementInScrollContainerView } from '@/lib/utils';
import type { DocItemForClient } from '@/service/directory-service-client';
import { ChevronDownIcon } from 'lucide-react';

interface SidebarProps {
  items: DocItemForClient[];
  language: string;
}

function scrollIntoContainerView(target: HTMLElement, container: HTMLElement) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offsetTop = targetRect.top - containerRect.top + container.scrollTop;
  const offsetBottom =
    targetRect.bottom - containerRect.bottom + container.scrollTop;

  if (targetRect.top < containerRect.top) {
    // 滚动到顶部
    container.scrollTop = offsetTop;
  } else if (targetRect.bottom > containerRect.bottom) {
    // 滚动到底部
    container.scrollTop = offsetBottom;
  }
}

function scrollIntoContainerViewCenter(
  target: HTMLElement,
  container: HTMLElement,
  offsetPercentage: number = 0.3, // 默认显示在容器前30%位置
) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // 元素顶部相对于容器顶部的位置（加上容器的 scrollTop 表示绝对位置）
  const targetOffset = targetRect.top - containerRect.top + container.scrollTop;

  // 计算容器指定百分比位置要 scrollTop 到多少
  const scrollTo =
    targetOffset -
    container.clientHeight * offsetPercentage +
    target.offsetHeight / 2;

  container.scrollTop = scrollTo;
}

// 递归渲染导航项
const NavItem = ({
  item,
  language,
  level = 0,
}: {
  item: DocItemForClient;
  language: string;
  level?: number;
}) => {
  const currentPath = usePathname();

  const hasChildren = item.children && item.children.length > 0;

  function getIsShouldOpen(
    isActive: boolean,
    hasChildren: boolean | undefined,
    item: DocItemForClient,
    currentPath?: string,
    language?: string,
  ) {
    return (
      isActive ||
      (hasChildren &&
        item.children?.some((child) =>
          currentPath?.startsWith(`/${language}/${child.path}`),
        ))
    );
  }

  const isShouldOpen = getIsShouldOpen(
    false,
    hasChildren,
    item,
    currentPath,
    language,
  );

  const [isOpen, setIsOpen] = useState(isShouldOpen);

  // 构建完整的链接路径，使用 fullPath
  const fullPath = `/${language}/${item.path}`;

  // 检查当前路径是否匹配
  const isActive = currentPath === fullPath;

  const myRef = useRef<HTMLAnchorElement>(null);
  const myRef2 = useRef<HTMLDivElement>(null);

  // 如果当前项或其子项是活动的，则自动展开
  useEffect(() => {
    if (isShouldOpen) {
      setIsOpen(true);
    }
  }, [isShouldOpen]);

  useEffect(() => {
    if (isActive) {
      const toscroll = myRef.current || myRef2.current;
      if (toscroll) {
        const container = document.getElementById('sidebar-scroll-container');
        if (container && !isElementInScrollContainerView(toscroll, container)) {
          scrollIntoContainerViewCenter(toscroll, container);
        }
      }
    }
  }, [isActive]);

  return (
    <li className={'my-0 py-0.5'}>
      {hasChildren ? (
        <details
          {...(isOpen ? { open: true } : {})}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <summary
            ref={myRef2}
            className={'rounded-md cursor-default p-0 flex gap-1'}
            onClick={(e) => {
              setIsOpen(!isOpen);
              e.preventDefault();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(!isOpen);
                e.preventDefault();
              }
            }}
          >
            <Link
              href={fullPath}
              onClick={(e) => {
                setIsOpen(true);
                e.stopPropagation();
              }}
              className={`block py-1 px-3 rounded-md text-sm w-full
            ${level === 0 ? 'font-medium' : ''} ${isActive ? 'desktop-sidebar-menu-item-active' : 'hover:desktop-sidebar-menu-item-hover focus:desktop-sidebar-menu-item-focus active:desktop-sidebar-menu-item-active'}
          `}
            >
              {item.name}
            </Link>
            <button
              type="button"
              className="px-1.5 py-1.5 hover:desktop-sidebar-menu-item-hover active:desktop-sidebar-menu-item-active rounded-md"
            >
              <ChevronDownIcon className="w-4 h-4 desktop-sidebar-menu-item-icon" />
            </button>
          </summary>
          <ul
            className={`pl-${
              level > 0 ? 2 : 1
            } mt-1 space-y-1 border-l border-base-300`}
          >
            {item.children?.map((child) => (
              <NavItem
                key={child.path}
                item={child}
                language={language}
                level={level + 1}
              />
            ))}
          </ul>
        </details>
      ) : (
        <Link
          ref={myRef}
          href={fullPath}
          className={`block py-1 px-3 rounded-md text-sm transition-colors ${
            level === 0 ? 'font-medium' : ''
          } ${isActive ? 'desktop-sidebar-menu-item-active' : 'hover:desktop-sidebar-menu-item-hover focus:desktop-sidebar-menu-item-focus active:desktop-sidebar-menu-item-active'}`}
        >
          {item.name}
        </Link>
      )}
    </li>
  );
};

export default function Sidebar({ items, language }: SidebarProps) {
  return (
    <nav>
      <ul className="space-y-2 desktop-sidebar-menu w-full">
        {items.map((item) => (
          <NavItem key={item.path} item={item} language={language} />
        ))}
      </ul>
    </nav>
  );
}
