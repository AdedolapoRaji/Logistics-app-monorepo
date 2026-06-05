FROM nginx:alpine
# Copy our static UI files directly into Nginx's default deployment host path
COPY index.html /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
