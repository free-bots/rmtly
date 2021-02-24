export interface SingletonFactory<T> {
  create(): T;
}

export const create = (factory: SingletonFactory<any>) => factory.create();

// import {create} from './SingletonService';
//
// class Test {
//   private static counter = 0;
//
//   public a(): void {
//     console.log(Test.counter);
//     Test.counter++;
//   }
// }
//
// let t: Test | null;
//
// const servcie = create({
//   create(): Test {
//     if (!t) {
//       t = new Test();
//     }
//     return t;
//   },
// }) as Test;
//
// export default servcie;
