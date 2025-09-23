import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  event.context.data = {};

  const cookies = parseCookies(event);
  const token = cookies.token ?? null;

  if (token) {
    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, "techglide", (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      event.context.data.user = decoded;
      event.context.data.isLogged = true;
      event.context.data.token = true;
    } catch (err) {
      event.context.data.token = false;
      event.context.data.status = false;
    }
  } else {
    event.context.data.token = false;
    event.context.data.status = false;
  }
});
