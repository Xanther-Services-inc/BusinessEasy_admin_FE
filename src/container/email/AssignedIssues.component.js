import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col, Card} from 'antd'
import {Link} from 'react-router-dom'

const AssignedIssue = ({email}) => {
    const [issues, setIssues] = useState([])

    useEffect(() => {
      const fetchOrders = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/issue/all-issues`)
        console.log(data);
        setIssues(data.filter((issue) => (issue.employee === email)))
      }
      fetchOrders()
    },[])
    console.log(issues);

    // const {employee, id, issue_category, issue_details, order_id, title, user_email} = issues

    return (
        <>
            <h3 style={{textAlign: 'center'}}>Assigned Issues</h3>
          <hr />
          <div className="site-card-wrapper">
          <Row gutter={16}>
          {issues.length != 0 ? 
            issues.map(issue => (  
              <Col key={issue.id} md={8} lg={8} xl={8} sm={12} xs={24}>
                <Link to={`/admin/assigned-issues/${issue.id}`}>
                <Card title={issue.title ? issue.title : 'Issue Title'} bordered={true}>
                  <p>Issue Id: {issue.id ? issue.id : 'NA'}</p>
                  <p>Issue Category: {issue.issue_category ? issue.issue_category : 'NA'}</p>
                  <p>Employee: {issue.employee ? issue.employee : 'NA'}</p>
                </Card>
                </Link>
              </Col>
            )) : <h1>No Assigned Issue Found!</h1>
          }
            </Row>
          </div>
        </>
    )
}

export default AssignedIssue;