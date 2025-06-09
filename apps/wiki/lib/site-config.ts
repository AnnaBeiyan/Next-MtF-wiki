export interface NavigationItem {
  key: string;
  href: string;
  translationKey: string;
  weight: number;
  showInPages?: string[]; // 指定在哪些页面显示，如果为空则在所有页面显示
}

export interface ThemeOption {
  key: string;
  labelKey: string; // 翻译键而非直接文本
  value: string;
  icon: string;
  descriptionKey: string; // 翻译键而非直接文本
}

export interface ThemeConfig {
  defaultTheme: string;
  themes: {
    light: string;
    dark: string;
  };
  options: ThemeOption[];
}

export interface SiteConfig {
  navigation: NavigationItem[];
  theme: ThemeConfig;
}

// 站点配置
export const siteConfig: SiteConfig = {
  navigation: [
    {
      key: 'docs',
      href: '/docs',
      translationKey: 'docs',
      weight: 1,
    },
    {
      key: 'converter',
      href: '/converter',
      translationKey: 'converter',
      weight: 2,
    },
    {
      key: 'cup-calculator',
      href: '/cup-calculator',
      translationKey: 'cupCalculator',
      weight: 3,
    },
    {
      key: 'about',
      href: '/about',
      translationKey: 'about',
      weight: 4,
    },
  ],
  theme: {
    defaultTheme: 'system',
    themes: {
      light: 'cupcake',
      dark: 'sunset',
    },
    options: [
      {
        key: 'system',
        labelKey: 'themeSystem',
        value: 'system',
        icon: 'computer',
        descriptionKey: 'themeSystemDesc',
      },
      {
        key: 'light',
        labelKey: 'themeLight',
        value: 'light',
        icon: 'sun',
        descriptionKey: 'themeLightDesc',
      },
      {
        key: 'dark',
        labelKey: 'themeDark',
        value: 'dark',
        icon: 'moon',
        descriptionKey: 'themeDarkDesc',
      },
      // 未来可以在这里添加更多主题选项，例如：
      // {
      //   key: 'high-contrast',
      //   label: '高对比度',
      //   value: 'high-contrast',
      //   icon: 'contrast',
      //   description: '使用高对比度主题，提升可访问性',
      // },
      // {
      //   key: 'colorblind-friendly',
      //   label: '色盲友好',
      //   value: 'colorblind-friendly',
      //   icon: 'eye',
      //   description: '使用色盲友好的配色方案',
      // },
    ],
  },
};

// 获取导航项配置
export function getNavigationItems(): NavigationItem[] {
  return siteConfig.navigation.sort((a, b) => a.weight - b.weight);
}

// 检查当前路径是否应该显示侧边栏和目录
export function shouldShowSidebar(pathname: string): boolean {
  return pathname.includes('/docs');
}

// 检查当前路径是否应该显示目录
export function shouldShowTableOfContents(pathname: string): boolean {
  return pathname.includes('/docs');
}

// 获取主题配置
export function getThemeConfig(): ThemeConfig {
  return siteConfig.theme;
}

// 获取主题选项
export function getThemeOptions(): ThemeOption[] {
  return siteConfig.theme.options;
}

// 根据主题值获取对应的 DaisyUI 主题名称
export function getDaisyUITheme(theme: string): string {
  const config = getThemeConfig();
  switch (theme) {
    case 'light':
      return config.themes.light;
    case 'dark':
      return config.themes.dark;
    default:
      return config.themes.light; // 默认返回浅色主题
  }
}
