import './App.scss'
import SignupForm from './components/SignupForm'
import NotificationHeader from './components/NotificationHeader'
import NotificationCarousel from './components/NotificationCarousel'
import WhaleAnalytics from './components/WhaleAnalytics'
import Testimonials from './components/Testimonials'

function App() {
  return (
    <div className="main-layout">
      <div className="content-section">
        <div className="left-section">
          <div className="notification-row">
            <NotificationHeader />
            <NotificationCarousel />
          </div>
          <div className="whale-analytics-section">
            <WhaleAnalytics />
          </div>
          <Testimonials />
        </div>
        <div className="right-section">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default App
