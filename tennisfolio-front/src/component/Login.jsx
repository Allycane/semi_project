// 2026-05-27 : useEffect 추가
import { useState, useRef, useEffect } from "react";
//2026-05-27 :useLocation, useNavigate import 추가
import { useLocation, useNavigate } from "react-router-dom";
import { Nav, Form, Modal, Button } from "react-bootstrap";
import { axiosPost } from "../util/dataAxios.js";
import { useAuthStore } from "../../store/useAuthStore.js";

import "../css/Nav.css";

function Login() {
	// URL 경로 감시
	const location = useLocation();
	// URL 변경하기
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	// 로딩 상태 추가
	const [loading, setLoading] = useState(false);

	// handleClose에 조건 추가
	const handleClose = () => {
		setShow(false);
		// /login URL에서 모달 닫으면 이전 페이지로 돌아가기
		if (location.pathname === "/login") {
			navigate(-1);
		}
	};

	//  handleShow에 navigate 추가
	const handleShow = () => {
		setShow(true);
		// 모달 열 때 URL도 /login으로 변경
		navigate("/login");
	};

	//  시작 - /login URL로 직접 접속 시 자동으로 모달 열기
	useEffect(() => {
		if (location.pathname === "/login") {
			setShow(true);
		}
	}, [location.pathname]);
	//  끝 - useEffect Hook

	// [정예원] Ref로 빈칸 제출 확인
	const idRef = useRef(null);
	const pwdRef = useRef(null);

	// [정예원] useAuthStore 상태관리
	const [formData, setFormData] = useState({ id: "", pwd: "" });
	const [errors, setErrors] = useState({ id: "", pwd: "" });
	const login = useAuthStore((s) => s.login);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ id: "", pwd: "" }); // [정예원] 입력 시 에러 초기화
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault(); // [정예원] 페이지 새로고침 방지

		if (!formData.id) {
			setErrors((prev) => ({ ...prev, id: "아이디를 입력해주세요" }));
			idRef.current.focus();
			return;
		}
		if (!formData.pwd) {
			setErrors((prev) => ({ ...prev, pwd: "비밀번호를 입력해주세요" }));
			pwdRef.current.focus();
			return;
		}

		try {
			// ✅ 추가됨: 로딩 상태 시작
			setLoading(true);

			console.log("로그인 요청 시작:", formData);
			const result = await axiosPost("/login", formData);
			console.log("서버 응답:", result);

			if (result && result.isLogin) {
				// [정예원] Zustand store에 로그인 정보 저장
				login({
					userId: formData.id,
					role: result.role,
					accessToken: result.token,
					isLogin: result.isLogin,
				});
				alert("로그인 되었습니다.");
				handleClose();
				setFormData({ id: "", pwd: "" });
			} else {
				const errorMsg = result?.message || "로그인에 실패하셨습니다.";
				alert(errorMsg);
				setFormData({ ...formData, pwd: "" }); // 비밀번호만 초기화
			}
		} catch (error) {
			console.error("로그인 요청 실패:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Nav.Link onClick={handleShow} href="#" className="loginLink">
				로그인
			</Nav.Link>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header>
					<img src="/img/logo.svg" alt="logo" />
					<button onClick={handleClose} type="button">
						<i className="fa-solid fa-x"></i>
					</button>
				</Modal.Header>
				<Modal.Body>
					{/* [정예원] 폼 전송 이벤트 연결 */}
					<Form onSubmit={handleLoginSubmit}>
						<Form.Group>
							<Form.Label>아이디</Form.Label>
							<Form.Control
								autoFocus
								name="id"
								value={formData.id}
								ref={idRef}
								onChange={handleFormChange}
								disabled={loading}
							/>
							<span style={{ color: "red", fontSize: "0.8rem" }}>
								{errors.id}
							</span>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Label>비밀번호</Form.Label>

							{/* [정예원] name, value, ref, onChange 연결 */}
							<Form.Control
								type="password"
								name="pwd"
								value={formData.pwd}
								ref={pwdRef}
								onChange={handleFormChange}
								disabled={loading}
							/>
							<span style={{ color: "red", fontSize: "0.8rem" }}>
								{errors.pwd}
							</span>
						</Form.Group>

						{/* [정예원] 버튼 타입 -> submit */}
						<Button type="submit" className="loginBtn mt-4" disabled={loading}>
							{loading ? "로그인 중..." : "로그인"}
						</Button>
					</Form>

					<div className="sign mt-3">
						<button type="button">회원가입</button>
						<button type="button">아이디·비밀번호 찾기</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Login;
