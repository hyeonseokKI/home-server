# 가볍고 표준적인 nginx 이미지
FROM nginx:alpine

# nginx 기본 설정 제거 (정적 서빙만 필요)
RUN rm /etc/nginx/conf.d/default.conf

# 정적 파일을 nginx 루트로 복사
COPY site/ /usr/share/nginx/html/

# 커스텀 nginx 설정 추가
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출 (컨테이너 내부)
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
