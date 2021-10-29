import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Signup from './pages/Signup';
import Modules from './pages/Modules';
import AddModule from './pages/AddModule';

import './App.css';
import ModuleDetail from './pages/ModuleDetail';
import NewLesson from './pages/NewLesson';
import EditModule from './pages/EditModule';
import AllLessons from './pages/AllLessons';
import UserModulesView from './pages/UserModulesView';
import UserLessonView from './pages/UserLessonView';
import AddAdmin from './pages/AddAdmin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/sign-up' component={Signup} />
        <Route path='/admin/dashboard' component={Dashboard} />
        <Route path='/admin/create/new-admin' component={AddAdmin} />
        <Route path='/admin/modules/new' component={AddModule} />
        <Route path='/admin/module/:id/lesson/new' component={NewLesson} />
        <Route path='/admin/module/:id/edit' component={EditModule} />
        <Route path='/admin/module/:id' component={ModuleDetail} />
        <Route path='/admin/modules/' component={Modules} />
        <Route path='/admin/lessons' component={AllLessons} />
        <Route path='/modules' component={UserModulesView} />
        <Route path='/module/:id' component={UserLessonView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
