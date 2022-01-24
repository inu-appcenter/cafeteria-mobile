/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

      const effectiveOrderedIds = orderedIds.filter(id => items.map(c => c.id).includes(id));

      const thoseCounted = items.filter(c => effectiveOrderedIds.includes(c.id));

      const thoseNotCounted = items.filter(c => !effectiveOrderedIds.includes(c.id));

      const ordered = effectiveOrderedIds.map(id => thoseCounted.find(c => c.id === id)).filter(notEmpty);

      return [...thoseNotCounted, ...ordered];
    };
  }
}

export default new GetOrderApplier();
