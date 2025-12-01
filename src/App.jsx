import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './components/Welcome';
import Assessment from './components/Assessment';
import Results from './components/Results';
import './index.css';

function App() {
  const [assessmentData, setAssessmentData] = useState(null);

  return (
    <Router basename="/6806FLHSWC">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/assessment"
            element={<Assessment onComplete={setAssessmentData} />}
          />
          <Route
            path="/results"
            element={<Results data={assessmentData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
