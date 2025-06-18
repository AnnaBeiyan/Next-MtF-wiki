import { HORMONES } from './constants';
// 简单的测试用例，验证换算功能
import {
  areUnitsEquivalent,
  convertHormoneValue,
  convertRangeToUnit,
  formatRangeText,
  formatRangeValue,
  getHormoneById,
  performConversion,
} from './utils';

// 测试雌二醇换算
function testEstradiolConversion() {
  const estradiol = getHormoneById('estradiol');
  if (!estradiol) throw new Error('Estradiol not found');

  // 测试 100 pg/mL 转换为 pmol/L
  const result1 = convertHormoneValue(100, 'pg/mL', 'pmol/L', estradiol);
  console.log('100 pg/mL =', result1.toFixed(2), 'pmol/L');

  // 测试 367 pmol/L 转换为 pg/mL
  const result2 = convertHormoneValue(367, 'pmol/L', 'pg/mL', estradiol);
  console.log('367 pmol/L =', result2.toFixed(2), 'pg/mL');
}

// 测试睾酮换算
function testTestosteroneConversion() {
  const testosterone = getHormoneById('testosterone');
  if (!testosterone) throw new Error('Testosterone not found');

  // 测试 300 ng/dL 转换为 nmol/L
  const result1 = convertHormoneValue(300, 'ng/dL', 'nmol/L', testosterone);
  console.log('300 ng/dL =', result1.toFixed(2), 'nmol/L');

  // 测试 10 nmol/L 转换为 ng/dL
  const result2 = convertHormoneValue(10, 'nmol/L', 'ng/dL', testosterone);
  console.log('10 nmol/L =', result2.toFixed(2), 'ng/dL');
}

// 测试完整转换功能
function testPerformConversion() {
  // 测试有效输入
  const result1 = performConversion('100', 'pg/mL', 'pmol/L', 'estradiol');
  console.log('Conversion result:', result1);

  // 测试无效输入
  const result2 = performConversion('abc', 'pg/mL', 'pmol/L', 'estradiol');
  console.log('Invalid input result:', result2);
}

// 测试单位等价性检查
function testUnitsEquivalent() {
  const estradiol = getHormoneById('estradiol');
  if (!estradiol) throw new Error('Estradiol not found');

  // 测试相同单位
  const same = areUnitsEquivalent(estradiol, 'pg/mL', 'pg/mL');
  console.log('pg/mL vs pg/mL equivalent:', same);

  // 测试不同单位
  const different = areUnitsEquivalent(estradiol, 'pg/mL', 'pmol/L');
  console.log('pg/mL vs pmol/L equivalent:', different);

  // 测试等价单位（如果存在）
  const equivalent = areUnitsEquivalent(estradiol, 'ng/L', 'pg/mL');
  console.log('ng/L vs pg/mL equivalent:', equivalent);
}

// 测试参考范围转换
function testRangeConversion() {
  const estradiol = getHormoneById('estradiol');
  if (!estradiol) throw new Error('Estradiol not found');

  // 获取第一个参考范围进行测试
  const range = estradiol.ranges[0];
  if (!range) {
    console.log('No ranges found for estradiol');
    return;
  }

  console.log(
    'Original range:',
    formatRangeText(range.min, range.max),
    range.unit,
  );

  // 转换到不同单位
  const convertedRange = convertRangeToUnit(range, 'pmol/L', estradiol);
  if (convertedRange) {
    console.log(
      'Converted to pmol/L:',
      formatRangeText(convertedRange.min, convertedRange.max),
      'pmol/L',
    );
  } else {
    console.log('Range conversion failed');
  }
}

// 测试格式化函数
function testFormatting() {
  console.log('Format 0:', formatRangeValue(0));
  console.log('Format 1.23456:', formatRangeValue(1.23456));
  console.log('Format 12.3456:', formatRangeValue(12.3456));
  console.log('Format 123.456:', formatRangeValue(123.456));
  console.log('Format 1234.56:', formatRangeValue(1234.56));
  console.log('Format Infinity:', formatRangeValue(Number.POSITIVE_INFINITY));

  console.log(
    'Range 0 to Infinity:',
    formatRangeText(0, Number.POSITIVE_INFINITY),
  );
  console.log(
    'Range 100 to Infinity:',
    formatRangeText(100, Number.POSITIVE_INFINITY),
  );
  console.log('Range 100 to 200:', formatRangeText(100, 200));
}

// 测试默认单位选择逻辑
function testDefaultUnits() {
  console.log('\n=== 默认单位选择测试 ===');

  for (const hormone of HORMONES) {
    console.log(`\n${hormone.name}:`);
    console.log(
      '所有单位:',
      hormone.units
        .map((u) => `${u.symbol}(${u.category || 'uncommon'})`)
        .join(', '),
    );

    // 显示常用单位
    const commonUnits = hormone.units.filter((u) => u.category === 'common');
    if (commonUnits.length > 0) {
      console.log('常用单位:', commonUnits.map((u) => u.symbol).join(', '));
    } else {
      console.log('常用单位: 无');
    }

    // 检查等价单位组
    const equivalentGroups: string[][] = [];
    const processed = new Set<string>();

    for (const unit of hormone.units) {
      if (processed.has(unit.symbol)) continue;

      const equivalents = hormone.units
        .filter((u) => areUnitsEquivalent(hormone, unit.symbol, u.symbol))
        .map((u) => u.symbol);

      if (equivalents.length > 1) {
        equivalentGroups.push(equivalents);
        for (const symbol of equivalents) {
          processed.add(symbol);
        }
      }
    }

    if (equivalentGroups.length > 0) {
      console.log(
        '等价单位组:',
        equivalentGroups.map((group) => `[${group.join(', ')}]`).join(', '),
      );
    } else {
      console.log('等价单位组: 无');
    }
  }
}

// 运行测试（仅在开发环境）
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('=== 激素换算器测试 ===');
  testEstradiolConversion();
  testTestosteroneConversion();
  testPerformConversion();
  testUnitsEquivalent();
  testRangeConversion();
  testFormatting();
  testDefaultUnits();
  console.log('=== 测试完成 ===');
}

export {
  testEstradiolConversion,
  testTestosteroneConversion,
  testPerformConversion,
  testUnitsEquivalent,
  testRangeConversion,
  testFormatting,
  testDefaultUnits,
};
