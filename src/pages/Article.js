import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/Article.css'

import { Button, Row, Col, Input, Select, DatePicker, message } from 'antd'
import axios from 'axios';
import servcePath from '../config/apiUrl';
import moment, { now } from 'moment';

const { Option } = Select
const { TextArea } = Input


function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类别') //选择的文章类别

    const dateFormat = 'YYYY-MM-DD';
    
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servcePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            (res) => {
                if (res.data.data == '没有登录') {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }
    // 修改文章的入口
    const getArticleById = (id) => {
        axios(servcePath.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
            }
        )
    }

    // 代码有问题，可能会一直循环
    useEffect(() => {
        getTypeInfo()
        let tempId = props.match.params.id
        if (tempId) {
            console.log(111)
            setArticleId(tempId)
            getArticleById(tempId)
        }
    }, [])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectTypeHandler = (value) => {
        setSelectType(value)
        console.log(value)
    }

    const saveArticle = () => {
        if (selectedType === '请选择类别') {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        // 将要发表的文章包装成一个数据库
        let dataProps = {
            type_id: selectedType,
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: new Date(showDate.replace('-', '/')).getTime() / 1000,
        }
        console.log(dataProps)

        if (articleId === 0) {
            //发送axios请求到后端，添加文章到数据库中
            axios({
                method: 'post',
                data: dataProps,
                url: servcePath.addArticle,
                withCredentials: true,// 跨域使用cookie
            }).then(
                (res) => {
                    // 返回的数据得到插入的id
                    setArticleId(res.data.insertId)
                    if (res.data.insertSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                }
            )
        } else {
            console.log('articleId:' + articleId)
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servcePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.updateSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }

    return (
        <div>
            <Row gutter={6}>
                <Col span={18}>
                    <Row gutter={6}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={(e) => {
                                    setArticleTitle(e.target.value)
                                }}
                            />
                        </Col>
                        <Col span={4} >
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    }
                                    )
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br></br>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>

                        </Col>
                    </Row>

                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={20}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                value={introducemd}
                            />
                            <br /><br />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => {
                                        setShowDate(dateString)
                                        // console.log('onchange的date',date)
                                    }}
                                    defaultValue={moment()}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle