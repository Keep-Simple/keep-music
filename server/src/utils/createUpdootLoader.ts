export const noop = () => null
// import DataLoader from 'dataloader'
// import { Updoot } from '../entities/Updoot'

// export const createUpdootLoader = () =>
//     new DataLoader<{ postId: number; userId: number }, Updoot | null>(
//         async (keys) => {
//             const updoots = await Updoot.findByIds(keys as any)

//             const updootIdsToUpdoots = updoots.reduce(
//                 (acc: Record<string, Updoot>, v) => {
//                     acc[`${v.userId}|${v.postId}`] = v
//                     return acc
//                 },
//                 {}
//             )

//             return keys.map(
//                 (key) => updootIdsToUpdoots[`${key.userId}|${key.postId}`]
//             )
//         }
//     )
