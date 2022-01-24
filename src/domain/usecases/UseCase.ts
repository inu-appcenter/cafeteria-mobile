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

export default abstract class UseCase<ParamT = void, ResultT = void> {
  async run(params: ParamT): Promise<ResultT> {
    console.log(
      `비동기 유스케이스 ${this.constructor.name}이(가) 다음 파라미터로 실행중입니다: ${JSON.stringify(
        params,
      )}.`,
    );
    return await this.onExecute(params);
  }

  abstract async onExecute(params: ParamT): Promise<ResultT>;
}
