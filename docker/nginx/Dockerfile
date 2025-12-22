# 가볍고 표준적인 nginx 이미지
FROM nginx:alpine

# 헬스체크에 필요한 도구 설치
RUN apk add --no-cache wget

# nginx 기본 설정 제거 (정적 서빙만 필요)
RUN rm /etc/nginx/conf.d/default.conf

# 정적 파일을 nginx 루트로 복사
COPY site/ /usr/share/nginx/html/

# 커스텀 nginx 설정 추가
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출 (컨테이너 내부)
EXPOSE 80

# 헬스체크 (Blue/Green 배포)
# - start-period: nginx 기동 워밍업 시간
# - interval: 체크 주기
# - timeout: 응답 제한
# - retries: 실패 허용 횟수
HEALTHCHECK --start-period=20s --interval=10s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
