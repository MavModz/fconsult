// composables/useSubadminPermissions.js
import { ref } from 'vue'

export const useSubadminPermissions = () => {
  const me = ref(null)
  const permission = ref(null)
  const loaded = ref(false)

  const loadPermissions = async () => {
    if (loaded.value) return { me, permission }

    const { data: meData } = await useFetch('/api/users/admin')
    me.value = meData.value

    if (me.value?.user?.subadminid) {
      const token = process.client ? localStorage.getItem('token') : null
      const { data: permData } = await useFetch(`/api/get-subadmin-data/${me.value.user.subadminid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      permission.value = permData.value?.data || {}
    }

    loaded.value = true
    return { me, permission }
  }

  return { me, permission, loadPermissions }
}
