export default function Intro() {
  return (
    <div
      className="
        max-w-md
        text-left
        px-6
        py-8
      "
    >
      {/* 1단락: 제목 */}
      <h1 className="text-3xl font-bold mb-6">
        Hi, I'm KIM HYEONSEOK 
      </h1>

        <span className="block w-20 h-[2px] bg-gray-400" />


      {/* 2단락: 설명 */}
      <p className="text-gray-500 leading-relaxed mb-6">
        안녕하세요. 방문해주셔서 감사합니다.
      </p>



      {/* 3단락: 구분/강조 */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          Intro Section
        </span>
      </div>
    </div>
  );
}
