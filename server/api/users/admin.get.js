// export default defineEventHandler(async (event) => {
//   console.log("events",event)
//   if (event.context) {
//     return { ...event.context.data }
//   } else {
//     return { isLogged: false }
//   }
// });

// export default defineEventHandler(async (event) => {
//   const userData = event.context?.data

//   if (userData && typeof userData === 'object') {
//     return { ...userData }
//   } else {
//     return { isLogged: false }
//   }
// })

import { toRaw } from 'vue'

export default defineEventHandler(async (event) => {
  const userData = event.context?.data

  if (userData && typeof userData === 'object') {
    // Option 1: Vue's toRaw
    return { ...toRaw(userData) }

    // Option 2: Deep clone to strip reactivity
    // return JSON.parse(JSON.stringify(userData))
  } else {
    return { isLogged: false }
  }
})
