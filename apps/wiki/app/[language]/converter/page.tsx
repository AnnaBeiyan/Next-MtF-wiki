import { HormoneConverter } from './components/HormoneConverter';
import { HelpTooltip } from './components/HelpTooltip';
import { Link } from '@/components/progress';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  return {
    title: '激素换算器 - MtF.wiki',
  };
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
              <Link
                href="/zh-cn/converter/science-literacy"
                className="link link-primary"
              >
                IU（国际单位）
              </Link>
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

export async function generateStaticParams() {
  return [{ language: 'zh-cn' }];
}