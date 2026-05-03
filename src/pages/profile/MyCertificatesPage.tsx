import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { authApi } from "../../services/auth";

export function MyCertificatesPage() {
  const navigate = useNavigate()


  const handleLogOut = async () => {
    try {
      await authApi.logout()
      localStorage.removeItem("token")
      navigate("/sign-in", { replace: true })
    } catch (err) {
      alert("Помилка при виході. Спробуйте ще раз.")
    }
  }

  return <div>
    <Button label="Log Out" onClick={() => { handleLogOut() }} />
  </div>
}
