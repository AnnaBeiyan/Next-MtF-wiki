import { HormoneConverter } from './components/HormoneConverter';
import { HelpTooltip } from './components/HelpTooltip';
import { getLanguagesInfo } from "@/service/directory-service";

// 生成静态参数，用于构建时预生成所有语言页面
export async function generateStaticParams() {
  const languagesInfo = await getLanguagesInfo();
  return languagesInfo.map(lang => ({ language: lang.code }));
}

export default function ConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-base-content">
              激素换算器
            </h1>
            <HelpTooltip />
          </div>
          <p className="text-base-content/70 text-lg">
            常用激素水平单位换算工具，支持多种常用单位互转
          </p>
        </header>
        
        <HormoneConverter />
        
        <footer className="mt-12 p-6 bg-base-200/50 rounded-xl">
          <div className="text-sm text-base-content/60 space-y-2">
            <p>
              <strong>注意：</strong>部分医院可能使用
              <a 
                href="https://zh.wikipedia.org/zh-hans/%E5%9B%BD%E9%99%85%E5%8D%95%E4%BD%8D" 
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                IU（国际单位）
              </a>
              作为衡量激素水平的单位，但由于IU为医学效价单位，其与质量单位的换算取决于药物种类且可能随时间变化。
            </p>
            <p>
              <strong>数据存储说明：</strong>您的换算历史记录仅存储在浏览器本地，不会上传到服务器。
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
