export default defineEventHandler(async (event) => {
  if (event.context) {
    return { status: true, isLogged: true, user: event.context.user }
  } else {
    return { isLogged: false }
  }
});