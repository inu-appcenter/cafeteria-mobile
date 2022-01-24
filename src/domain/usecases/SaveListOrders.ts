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

import UseCase from './UseCase';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

class SaveListOrders extends UseCase<number[], void> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute(params: number[]): Promise<void> {
    return await this.cafeteriaRepository.saveOrders(params);
  }
}

export default new SaveListOrders(CafeteriaRepository.instance);
