import type { HormoneType } from './types';

export const HORMONES: HormoneType[] = [
  {
    id: 'estradiol',
    name: '雌二醇 (E2)',
    baseUnit: 'pg/mL',
    molecularWeight: 272.38,
    units: [
      { name: '皮克/毫升', symbol: 'pg/mL', multiplier: 1 },
      { name: '纳克/分升', symbol: 'ng/dL', multiplier: 10 },
      { name: '皮摩尔/升', symbol: 'pmol/L', multiplier: 1 / 3.671 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 8,
        max: 35,
        unit: 'pg/mL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: 'GAHT 目标范围',
        min: 100,
        max: 200,
        unit: 'pg/mL',
        description: 'GAHT 推荐范围',
        color: 'success',
        iconType: 'target',
        source: {
          name: 'MtF.wiki GAHT 指南',
          url: '/zh-cn/docs/medicine/hrt'
        }
      },
      {
        label: '女性卵泡期',
        min: 30,
        max: 100,
        unit: 'pg/mL',
        description: '生理女性卵泡期范围',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '过高风险',
        min: 300,
        max: Infinity,
        unit: 'pg/mL',
        description: '可能存在血栓风险',
        color: 'error',
        iconType: 'error',
        source: {
          name: 'MtF.wiki 安全指南',
          url: '/zh-cn/docs/medicine/safety'
        }
      }
    ]
  },
  {
    id: 'testosterone',
    name: '睾酮 (T)',
    baseUnit: 'ng/dL',
    molecularWeight: 288.43,
    units: [
      { name: '纳克/分升', symbol: 'ng/dL', multiplier: 1 },
      { name: '纳摩尔/升', symbol: 'nmol/L', multiplier: 28.84 },
      { name: '皮克/毫升', symbol: 'pg/mL', multiplier: 0.1 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 264,
        max: 916,
        unit: 'ng/dL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性参考范围',
        min: 10,
        max: 55,
        unit: 'ng/dL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: 'GAHT 目标范围',
        min: 0,
        max: 50,
        unit: 'ng/dL',
        description: 'GAHT 推荐范围',
        color: 'success',
        iconType: 'target',
        source: {
          name: 'MtF.wiki GAHT 指南',
          url: '/zh-cn/docs/medicine/hrt'
        }
      }
    ]
  },
  {
    id: 'prolactin',
    name: '泌乳素 (PRL)',
    baseUnit: 'ng/mL',
    units: [
      { name: '纳克/毫升', symbol: 'ng/mL', multiplier: 1 },
      { name: '毫国际单位/升', symbol: 'mIU/L', multiplier: 47.17 },
      { name: '微克/升', symbol: 'μg/L', multiplier: 1 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 2,
        max: 18,
        unit: 'ng/mL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性参考范围',
        min: 4.79,
        max: 23.3,
        unit: 'ng/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '轻度升高',
        min: 30,
        max: 100,
        unit: 'ng/mL',
        description: '可能需要关注',
        color: 'warning',
        iconType: 'warning',
        source: {
          name: '临床医学标准',
          url: 'https://zh.wikipedia.org/wiki/泌乳素'
        }
      },
      {
        label: '显著升高',
        min: 100,
        max: Infinity,
        unit: 'ng/mL',
        description: '建议就医检查',
        color: 'error',
        iconType: 'error',
        source: {
          name: '临床医学标准',
          url: 'https://zh.wikipedia.org/wiki/泌乳素'
        }
      }
    ]
  },
  {
    id: 'progesterone',
    name: '孕酮 (P4)',
    baseUnit: 'ng/mL',
    molecularWeight: 314.46,
    units: [
      { name: '纳克/毫升', symbol: 'ng/mL', multiplier: 1 },
      { name: '纳摩尔/升', symbol: 'nmol/L', multiplier: 0.31446 },
      { name: '纳克/分升', symbol: 'ng/dL', multiplier: 0.01 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 0.1,
        max: 1.0,
        unit: 'ng/mL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性卵泡期',
        min: 0.1,
        max: 1.5,
        unit: 'ng/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性黄体期',
        min: 2.0,
        max: 25.0,
        unit: 'ng/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      }
    ]
  },
  {
    id: 'fsh',
    name: '卵泡刺激素 (FSH)',
    baseUnit: 'mIU/mL',
    units: [
      { name: '毫国际单位/毫升', symbol: 'mIU/mL', multiplier: 1 },
      { name: '国际单位/升', symbol: 'IU/L', multiplier: 1000 },
      { name: '毫国际单位/升', symbol: 'mIU/L', multiplier: 0.001 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 1.8,
        max: 11.2,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性卵泡期',
        min: 1.8,
        max: 11.2,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '绝经后女性',
        min: 30,
        max: 120,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      }
    ]
  },
  {
    id: 'lh',
    name: '促黄体素 (LH)',
    baseUnit: 'mIU/mL',
    units: [
      { name: '毫国际单位/毫升', symbol: 'mIU/mL', multiplier: 1 },
      { name: '国际单位/升', symbol: 'IU/L', multiplier: 1000 },
      { name: '毫国际单位/升', symbol: 'mIU/L', multiplier: 0.001 },
    ],
    ranges: [
      {
        label: '男性参考范围',
        min: 2.0,
        max: 9.0,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'male',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性卵泡期',
        min: 2.0,
        max: 9.0,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '女性黄体期',
        min: 2.0,
        max: 11.0,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      },
      {
        label: '绝经后女性',
        min: 20.0,
        max: 70.0,
        unit: 'mIU/mL',
        description: '',
        color: 'info',
        iconType: 'female',
        source: {
          name: 'MtF.wiki 激素检查',
          url: '/zh-cn/docs/medicine/monitoring'
        }
      }
    ]
  }
];

export const DEFAULT_HORMONE = 'estradiol';
