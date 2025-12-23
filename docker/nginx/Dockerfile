# =========================
# Build stage Next.js 
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# 의존성 먼저 복사 (캐시 최적화)
COPY package.json package-lock.json ./
RUN npm ci

# 소스 전체 복사
COPY . .

# Next.js SSG build (out/ 생성)
RUN npm run build

# =========================
# Runtime stage nginx
# =========================

# 가볍고 표준적인 nginx 이미지
FROM nginx:alpine

# 헬스체크에 필요한 도구 설치
RUN apk add --no-cache wget

# nginx 기본 설정 제거 (정적 서빙만 필요)
RUN rm /etc/nginx/conf.d/default.conf

#  Next.js SSG 결과물 복사
COPY --from=build /app/out /usr/share/nginx/html

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
  CMD wget -qO- http://localhost/index.html || exit 1

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
