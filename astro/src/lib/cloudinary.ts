const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const fetchBase = import.meta.env.PUBLIC_CLOUDINARY_FETCH_BASE_URL?.trim();
const isDev = import.meta.env.DEV;

const shouldBypassCloudinary = (base?: string) => {
  if (isDev) return true;
  if (!cloudName || !base) return true;
  return /localhost|127\.0\.0\.1/.test(base);
};

export const buildCloudinarySrc = (localPath: string, transformation = 'f_auto,q_auto,c_fill,w_1600') => {
  if (shouldBypassCloudinary(fetchBase)) {
    return localPath;
  }
  const base = fetchBase!.endsWith('/') ? fetchBase!.slice(0, -1) : fetchBase!;
  const absolute = /^https?:\/\//.test(localPath)
    ? localPath
    : `${base}${localPath.startsWith('/') ? localPath : `/${localPath}`}`;
  const encoded = encodeURIComponent(absolute);
  return `https://res.cloudinary.com/${cloudName!}/image/fetch/${transformation}/${encoded}`;
};
