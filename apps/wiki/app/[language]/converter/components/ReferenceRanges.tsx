'use client';

import { Link } from '@/components/progress';
import { useAtom } from 'jotai';
import { Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { conversionStateAtom } from '../lib/atoms';
import type { HormoneType } from '../lib/types';
import {
  areUnitsEquivalent,
  convertRangeToUnit,
  formatRangeText,
} from '../lib/utils';

interface ReferenceRangesProps {
  hormone: HormoneType;
}

export function ReferenceRanges({ hormone }: ReferenceRangesProps) {
  const [state] = useAtom(conversionStateAtom);

  // 获取当前选择的单位
  const fromUnit = state.fromUnit;
  const toUnit = state.toUnit;

  // 检查两个单位是否等价
  const unitsAreEquivalent = areUnitsEquivalent(hormone, fromUnit, toUnit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-base-100/30 backdrop-blur-sm rounded-xl p-6 border border-base-300/30 h-fit"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-info" />
        <h3 className="text-lg font-semibold">参考范围说明</h3>
      </div>
      {hormone.ranges.length > 0 ? (
        <div className="space-y-4">
          {hormone.ranges.map((range, index) => {
            // 转换范围到fromUnit和toUnit
            const fromUnitRange = convertRangeToUnit(range, fromUnit, hormone);
            const toUnitRange = convertRangeToUnit(range, toUnit, hormone);

            return (
              <motion.div
                key={`${range.label}-${range.unit}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + 0.1 * index, duration: 0.3 }}
                className={`p-4 rounded-lg border-l-4 ${
                  range.color === 'success'
                    ? 'border-success bg-success/10'
                    : range.color === 'warning'
                      ? 'border-warning bg-warning/10'
                      : range.color === 'error'
                        ? 'border-error bg-error/10'
                        : 'border-info bg-info/10'
                }`}
              >
                <div className="font-medium text-base-content">
                  {range.label}
                </div>
                <div className="text-sm text-base-content/70 mt-1">
                  {unitsAreEquivalent || !fromUnitRange || !toUnitRange ? (
                    // 等价单位或转换失败时，只显示一种单位
                    <>
                      {formatRangeText(range.min, range.max)} {range.unit}
                    </>
                  ) : (
                    // 不等价单位时，显示两种单位的范围
                    <>
                      {formatRangeText(fromUnitRange.min, fromUnitRange.max)}{' '}
                      {fromUnit}
                      <span className="text-base-content/50 mx-2">/</span>
                      {formatRangeText(toUnitRange.min, toUnitRange.max)}{' '}
                      {toUnit}
                    </>
                  )}
                </div>
                {range.description && (
                  <div className="text-xs text-base-content/60 mt-1">
                    {range.description}
                  </div>
                )}
                <div className="text-xs text-base-content/50 mt-1 italic">
                  数据来源：
                  <Link
                    href={range.source.url}
                    className="link link-primary hover:link-accent transition-colors"
                    rel="noopener noreferrer"
                  >
                    {range.source.name}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-base-content/60">暂无参考范围</div>
      )}
    </motion.div>
  );
}
