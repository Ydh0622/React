import React, { useState } from "react";

const Lesson4_OWASP = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const owaspTop10 = [
    {
      id: 1,
      title: "Broken Access Control",
      description:
        "인가되지 않은 사용자가 제한된 리소스에 접근할 수 있는 취약점",
      example:
        "관리자 페이지에 직접 URL로 접근, 다른 사용자의 데이터 조회/수정",
      prevention: "적절한 인증/인가 체계 구축, 역할 기반 접근 제어(RBAC) 구현",
    },
    {
      id: 2,
      title: "Cryptographic Failures",
      description:
        "민감한 데이터가 암호화되지 않거나 약한 암호화를 사용하는 취약점",
      example:
        "평문으로 비밀번호 저장, HTTPS 미사용, 약한 암호화 알고리즘 사용",
      prevention:
        "강력한 암호화 알고리즘 사용, HTTPS 필수, 민감 데이터 식별 후 암호화 저장",
    },
    {
      id: 3,
      title: "Injection",
      description:
        "사용자 입력을 검증하지 않아 악의적인 코드가 실행되는 취약점",
      example: "SQL Injection , Command Injection , NoSQL Injection",
      prevention:
        "입력값 검증 및 이스케이프, 준비된 문 (Prepared Statement) 사용",
    },
    {
      id: 4,
      title: "Insecure Design",
      description: "보안 설계가 제대로 이루어지지 않은 취약점",
      example: "보안을 고려하지 않은 아키텍쳐 통신 설계 , 위협 모델링 부재",
      prevention: "보안 우선 설계, 위협 모델링 수행, 보안 패턴 적용",
    },
    {
      id: 5,
      title: "Security Misconfiguration",
      description: "잘못된 보안 설정으로 인한 취약점",
      example:
        "기본 계정 사용, 불필요한 기능 활성화 , 오류 메시지에 민감 정보 노출",
      prevention:
        "보안 설정 가이드 준수, 정기적인 보안 점검, 최소 권한 원칙 적용",
    },
    {
      id: 6,
      title: "Vulnerable Components",
      description: "알려진 취약점이 있는 오래된 라이브러리나 컴포넌트 사용",
      example:
        "오래된 JQuery 버전, 알려진 취약점이 있는 오래된 프레임워크 사용",
      prevention: "정기적인 의존성 업데이트, 취약점 스캔 도구 사용",
    },
    {
      id: 7,
      title: "Authentication Failures",
      description: "인증 시스템의 취약점",
      example: "약한 비밀번호 정책, 세선 고정, 무차별 대입 공격 허용",
      prevention: "다단계 인증(MFA) , 강력한 비밀번호 정책, 계정 잠금 기능",
    },
    {
      id: 8,
      title: "Software and Data Integrity Failures",
      description: "소프트웨어와 데이터의 무결성 검증 실패",
      example: "서명되지 않은 업데이트, CI/CD 파이프라인 보안 부재",
      prevention: " 디지털 서명 검증, 안전한 CI/CD 파이프라인 구축",
    },
    {
      id: 9,
      title: "Security Logging Failures",
      description: "보안 로깅 및 모니터링 부족",
      example: "로그 기록 부재, 보안 이벤트 모니터링 없음",
      prevention: "모든 보안 이벤트 로깅, 실시간 모니터링 시스템 구축",
    },
    {
      id: 10,
      title: " Server-Side Request Forgery",
      description: "서버가 신뢰할 수 없는 소스로 요청을 보내도록 유도하는 공격",
      example: "내부 네트워크 스캔, 클라우드 메타데이터 서비스 접근",
      prevention: "URL 화이트리스트, 네트워크 분리, 입력값 검증",
    },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2> 4. OWASP TOP 10 소개 및 개념 이해</h2>

        <div className="info-box">
          <strong>학습 목표</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>OWASP TOP 10의 주요 취약점 이해</li>
            <li>각 취약점의 공격 방법과 영향</li>
            <li>취약점 방어 방법 학습</li>
            <li>웹 애플리케이션 보안 향상 가이드</li>
          </ul>
        </div>

        <h3>OWASP란?</h3>
        <p>
          OWASP (Open Web Application Security Project) 는 웹 애플리케이션
          보안에 대한 오픈 소스 프로젝트입니다. OWASP TOP 10은 가장 심각하고
          흔한 웹 애플리케이션 보안 취약점 10가지를 정리한 것입니다.
        </p>

        <h3> OWASP TOP10 (2021)</h3>
        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          {owaspTop10.map((item) => {
            const isOpen = selectedItem === item.id;
            return (
              <div
                key={item.id}
                style={{
                  padding: "15px",
                  background: isOpen
                    ? "rgba(107,122,141,0.2)"
                    : "rgba(255,255,255,0.03)",
                  border: `2px solid ${isOpen ? "#6b7a8d" : "#4a4a4a"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onClick={() => setSelectedItem(isOpen ? null : item.id)}
              >
                <h4 style={{ margin: "0 0 10px 0", color: "#a8b5c8" }}>
                  {item.id}, {item.title}
                </h4>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  {item.description}
                </p>

                {isOpen && (
                  <div
                    style={{
                      marginTop: "20px",
                      borderTop: "1px solid black",
                      paddingTop: "15px",
                    }}
                  >
                    <div>
                      <strong>공격 예시</strong>
                      <p style={{ marginTop: "8px" }}>{item.example}</p>
                    </div>
                    <div>
                      <strong>예방법</strong>
                      <p style={{ marginTop: "8px" }}>{item.prevention}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="warning-box">
          <strong>보안 모범 사례</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>모든 사용자 입력을 검증하고 이스케이프 처리</li>
            <li>최소 권한 원칙 적용</li>
            <li>정기적인 보안 업데이트 및 취약점 스캔</li>
            <li>강력한 인증 및 인가 매커니즘 구현</li>
            <li>민감한 데이터 암호화 및 안전한 저장</li>
            <li>보안 로깅 및 모니터링 시스템 구축</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson4_OWASP;
