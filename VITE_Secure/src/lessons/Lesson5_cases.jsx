import React, { useState } from "react";

const Lesson05_cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const securityCases = [
    {
      id: 1,
      title: "Equifax 데이터 유출 사고 (2017)",
      description: "1억 4천만 명의 개인정보 유출",
      cause: "Apache Struts 프레임워크의 알려진 취약점을 패치하지 않음",
      impact: "신용카드 정보, 주민등록번호 등 대량의 민감 정보 유출",
      lesson: "의존성 관리와 정기적인 보안 업데이트의 중요성",
    },
    {
      id: 2,
      title: "Yahoo 계정 유출(2013-2014)",
      description: "30억 명의 계정 정보 유출",
      cause: "SQL Injection 취약점과 약한 암호화",
      impact: "계정 정보, 비밀번호 해시, 보안 질문 답변 유출",
      lesson: "입력값 검증과 강력한 암호화의 필요성",
    },
    {
      id: 3,
      title: "Target 매장 해킹 사건 (2013)",
      cause: "제3자 벤더를 통합 침입, 네트워크 분리 부재",
      impact: "신용카드 정보. 개인정보 대량 유출",
      lesson: "제3자 접근 관리와 네트워크 분리의 중요성",
    },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2>5. 주요 보안사고 사례 및 개념 이해</h2>
        <div className="info-box">
          <strong>학습 목표</strong>
          <ul style={{ textAlign: "left", margintop: "10px" }}>
            <li>실제 발생한 보안 사고 사례 분석</li>
            <li>보안 아키텍쳐와 비보안 아키텍쳐 비교</li>
            <li>보안 사고의 원인과 영향 이해</li>
            <li>보안 아키텍쳐 설계 원칙 학습</li>
          </ul>
        </div>

        <h3>보안 아키텍쳐 vs 비보안 아키텍쳐</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              padding: "20px",
              background: "rgba(180,120,120,0.12)",
              border: "2px solid #b47878",
              borderRadius: "8px",
            }}
          >
            <h4>비보안 아키텍쳐</h4>
            <ul style={{ textAlign: "left", marginTop: "10px" }}>
              <li>사용자 입력 검증 없음</li>
              <li>평문 비밀번호 저장</li>
              <li>인증/인가 체계 부재</li>
              <li>암호화 미사용</li>
              <li>로깅 및 모니터링 없음</li>
              <li>의존성 업데이트 안함</li>
              <li>네트워크 분리 없음</li>
              <li>에러 메시지에 민감 정보 노출</li>
            </ul>
          </div>
          <div
            style={{
              padding: "20px",
              background: "rgba(180,120,120,0.12)",
              border: "2px solid #a8c4b4",
              borderRadius: "8px",
            }}
          >
            <h4>보안 아키텍쳐</h4>
            <ul style={{ textAlign: "left", marginTop: "10px" }}>
              <li>모든 입력값 검증 및 이스케이프</li>
              <li>강력한 해시 알고리즘 사용(bcrypt, Argon2)</li>
              <li>역할 기반 접근 제어(RBAC)</li>
              <li>전송 및 저장 데이터 암호화</li>
              <li>보안 이벤트 로깅 및 모니터링</li>
              <li>정기적인 의존성 업데이트</li>
              <li>네트워크 세그멘테이션</li>
              <li>안전한 에러 처리</li>
            </ul>
          </div>
        </div>

        <h3>실제 보안 사고 사례</h3>
        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          {securityCases.map((caseItem) => (
            <div
              key={caseItem.id}
              style={{
                padding: "20px",
                background:
                  selectedCase === caseItem.id
                    ? "rgba(107,122,141,0.2)"
                    : "rgba(255,255,255,0.03)",
                border: `2px solid ${
                  selectedCase === caseItem.id ? "#6b7a8d" : "#4a4a4a"
                }`,
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onClick={() => setSelectedCase(caseItem.id)}
            >
              <h4 style={{ margin: "0 0 10px 0", color: "#a8b5c8" }}>
                {caseItem.title}
              </h4>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                {caseItem.description}
              </p>
            </div>
          ))}
        </div>
        {selectedCase && (
          <div className="lesson-section" style={{ marginTop: "30px" }}>
            <h3>사고 상세 분석</h3>
            {(() => {
              const caseItem = securityCases.find((c) => c.id === selectedCase);
              return (
                <div>
                  <h4>{caseItem.title}</h4>
                  <div>
                    <strong>사고 개요 : </strong>
                    <p>{caseItem.description}</p>
                  </div>
                  <div>
                    <strong>원인: </strong>
                    <p>{caseItem.cause}</p>
                  </div>
                  <div>
                    <strong>영향: </strong>
                    <p>{caseItem.impact}</p>
                  </div>
                  <div>
                    <strong>교훈 : </strong>
                    <p>{caseItem.lesson}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <h3> 보안 아키텍쳐 설계 원칙</h3>
        <div className="info-box" style={{ marginTop: "20px" }}>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>
              Defense in Depth (다층 방어) : 여러 보안 계층을 구축하여 한 계층이
              실패해도 다른 계층이 보호{" "}
            </li>
            <li>
              Least Privilege (최소 권한) : 사용자나 시스템에 필요한 최소한의
              권한만 부여{" "}
            </li>
            <li>
              Fail Secure (안전 실패) : 오류 발생 시 보안을 유지하는 방향으로
              실패
            </li>
            <li>
              Separation of Duties (책임 분리) : 중요한 작업을 여러 사람이
              나누어 수행
            </li>
            <li>
              Security by Design (설계 단계 보안) : 개발초기부터 보안을 고려한
              설계
            </li>
            <li>Zero trust (무신뢰) : 내부 네트워크도 신뢰하지 않고 검증</li>
          </ul>
        </div>

        <div className="warning-box" style={{ marginTop: "30px" }}>
          <strong>주의 사항!</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>보안은 한 번에 완성되는 것이 아니라 지속적인 과정입니다</li>
            <li>정기적인 보안 점검과 취약점 스캔이 필요합니다.</li>
            <li>보안 사고 발생 시 신속한 대응 계획을 수립해야 합니다.</li>
            <li>직원 교육과 보안 인식 제고가 필요합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson05_cases;
