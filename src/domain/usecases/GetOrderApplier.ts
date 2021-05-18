import {notEmpty} from '../../common/utils/Value';
import SyncUseCase from './SyncUseCase';

type NumericId = {
  id: number;
};

export type OrderApplier = <T extends NumericId>(items?: T[]) => T[];

class GetOrderApplier extends SyncUseCase<number[], OrderApplier> {
  onExecute(orderedIds: number[]): OrderApplier {
    return items => {
      if (items === undefined) {
        return [];
      }

      const effectiveOrderedIds = orderedIds.filter(id =>
        items.map(c => c.id).includes(id),
      );

      const thoseCounted = items.filter(c =>
        effectiveOrderedIds.includes(c.id),
      );

      const thoseNotCounted = items.filter(
        c => !effectiveOrderedIds.includes(c.id),
      );

      const ordered = effectiveOrderedIds
        .map(id => thoseCounted.find(c => c.id === id))
        .filter(notEmpty);

      return [...thoseNotCounted, ...ordered];
    };
  }
}

export default new GetOrderApplier();
