import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import Users from './users';
import Ecommerce from './ecommerce';
import withAdminLayout from '../../layout/withAdminLayout';
import IssueDetails from '../../container/email/overview/issueDetails';
import EmpProjects from '../../container/pages/AssignedProjectsEmp';
import { useSelector } from 'react-redux';
import AdminHome from '../../container/AdminHome'



const Inbox = lazy(() => import('../../container/email/Email'));

const EmpWorkHour = lazy(() => import('../../container/EmpLogin/EmpLogin'))
const AssignedProjects = lazy(() => import('../../container/pages/AssignedProjectDetailsEmp'))
const Error404 = lazy(() => import('../../container/pages/404'))
const EmpIssues = lazy(() => import('../../container/email/AssignedIssuesEmp'))
const EmpIssueDetails = lazy(() => import('../../container/email/overview/EmpIssueDetails'))
const AddTestimonial = lazy(() => import('../../container/testimonial/AddTestimonial'))
const Testimonials = lazy(() => import('../../container/testimonial/Grid'))
const TestimonialDetails = lazy(() => import('../../container/testimonial/TestimonialDetails'))
const AddFaq = lazy(() => import('../../container/FAQ/AddFaq'))
const Faqs = lazy(() => import('../../container/FAQ/Grid'))
const FaqDetails = lazy(() => import('../../container/FAQ/FaqDetails'))
import TeamDetails from '../../container/pages/overview/TeamDetails'
const Team = lazy(() => import('../../container/pages/Team'));
const AddUser = lazy(() => import('../../container/pages/AddUsers'));




const Admin = () => {
  const { path } = useRouteMatch();
  const { isLoggedIn} = useSelector(state => {
    return {
    
      isLoggedIn: state.auth.login || localStorage.getItem('adminInfo')
    };
  });
  // const isLoggedInJsonObject = (isLoggedIn)?JSON.parse(JSON.stringify(isLoggedIn)):{}
  console.log(isLoggedIn)
  var isLoggedInJsonObject = {}
  try {
   
    isLoggedInJsonObject = JSON.parse(isLoggedIn); 
} catch (e) {
    
    isLoggedInJsonObject = isLoggedIn;
}

const token = isLoggedInJsonObject.token
axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${token}`;
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        {isLoggedInJsonObject && ((isLoggedInJsonObject.type) === "super_user")  ? 
        <>
        
       
        <Route path={`${path}`} exact component={AdminHome} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/issue/single/:id`} component={IssueDetails} />
        <Route path={`${path}/assigned-orders/:id`} component={AssignedProjects} />
        <Route path={`${path}/assigned-issues/:id`} component={EmpIssueDetails} />
        <Route path={`${path}/add-testimonial`} component={AddTestimonial} />
        <Route path={`${path}/testimonials`} component={Testimonials} />
        <Route path={`${path}/testimonial/:id`} component={TestimonialDetails} />
        <Route path={`${path}/add-faq`} component={AddFaq} />
        <Route exact path={`${path}/faq`} component={Faqs} />
        <Route path={`${path}/faq/:id`} component={FaqDetails} />


        </> : isLoggedInJsonObject && ((isLoggedInJsonObject).type === 'b_manager')  ? 
        <>
     
        <Route path={`${path}`} exact component={AdminHome} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/issue/single/:id`} component={IssueDetails} />
        <Route path={`${path}/assigned-orders/:id`} component={AssignedProjects} />
        <Route path={`${path}/assigned-issues/:id`} component={EmpIssueDetails} />
        <Route path="/admin/users/team/:email" component={TeamDetails} />
      <Route path={`${path}/users/team`} component={Team} />
      <Route path={`${path}/users/add-user`} component={AddUser} />



        </> : isLoggedInJsonObject && ((isLoggedInJsonObject).type === 'employee')  ? 
        <>
        <Route path={`${path}`} exact component={AdminHome} />
        <Route path={`${path}/workhour`} component={EmpWorkHour} />
        <Route exact path={`${path}/assigned-orders`} component={EmpProjects} />
        <Route path={`${path}/assigned-orders/:id`} component={AssignedProjects} />
        <Route path={`${path}/assigned-issues`} exact component={EmpIssues} />
        <Route path={`${path}/assigned-issues/:id`} component={EmpIssueDetails} />

        </> : <Error404 />
      }
        
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);