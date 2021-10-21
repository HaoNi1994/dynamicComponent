export const SEARCH = {
     // 获取A列表数据
     'GET /nihao/api/v1/meau': {
        code: 200,
        data: [
            {id: '1', grade: '小学', children: [{name: '数学'}]},
            {id: '2', grade: '初中', children: [{name: '语文'}]}
        ]
    },
     // 根据项目id获取数据
     'GET /nihao/api/v1/getProjectData?projectId=1': {
        code: 200,
        data: [
            {id: '1', title: '奥数课程', status: '进行中', number: '2233', type: '小学-数学', member: '黄老师'},
            {id: '2', title: '基础课程', status: '进行中', number: '2234', type: '小学-数学', member: '王老师'},
            {id: '3', title: '奥数课程', status: '进行中', number: '2235', type: '小学-数学', member: '程老师'},
            {id: '4', title: '课后课程', status: '已完成', number: '2236', type: '小学-数学', member: '柯老师'},
            {id: '5', title: '奥数课程', status: '进行中', number: '2237', type: '小学-数学', member: '刘老师'},
        ]
    },
    // 根据项目id获取数据
    'GET /nihao/api/v1/getProjectData?projectId=2': {
        code: 200,
        data: [
            {id: '6', title: '诗词课程', status: '进行中', number: '2133', type: '小学-语文', member: '黄老师'},
            {id: '7', title: '文言文课程', status: '进行中', number: '2134', type: '小学-语文', member: '王老师'},
            {id: '8', title: '文字课程', status: '进行中', number: '2135', type: '小学-语文', member: '程老师'},
            {id: '9', title: '课后课程', status: '已完成', number: '2136', type: '小学-语文', member: '柯老师'},
            {id: '10', title: '诗词课程', status: '进行中', number: '2137', type: '小学-语文', member: '刘老师'},
        ]
    },
    // 根据id,获取详情
    'GET /nihao/api/v1/getDetail?taskId=1': {
        code: 200,
        data: {
            id: '1',
            title: '奥数课程',
            status: '进行中',
            number: '2233',
            type: '小学-数学',
            member: '黄老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=2': {
        code: 200,
        data: {
            id: '2',
            title: '基础课程',
            status: '进行中',
            number: '2234',
            type: '小学-数学',
            member: '王老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=3': {
        code: 200,
        data: {
            id: '3',
            title: '奥数课程',
            status: '进行中',
            number: '2235',
            type: '小学-数学',
            member: '程老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=4': {
        code: 200,
        data: {
            id: '6',
            title: '课后课程',
            status: '已完成',
            number: '2236',
            type: '小学-数学',
            member: '柯老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=5': {
        code: 200,
        data: {
            id: '5',
            title: '奥数课程',
            status: '进行中',
            number: '2133',
            type: '小学-数学',
            member: '刘老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=6': {
        code: 200,
        data: {
            id: '6',
            title: '诗词课程',
            status: '进行中',
            number: '2133',
            type: '小学-语文',
            member: '黄老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=7': {
        code: 200,
        data: {
            id: '7',
            title: '文言文课程',
            status: '进行中',
            number: '2134',
            type: '小学-语文',
            member: '王老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=8': {
        code: 200,
        data: {
            id: '8',
            title: '文字课程',
            status: '进行中',
            number: '2135',
            type: '小学-语文',
            member: '程老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=9': {
        code: 200,
        data: {
            id: '9',
            title: '课后课程',
            status: '已完成',
            number: '2136',
            type: '小学-语文',
            member: '柯老师',
        }
    },
    'GET /nihao/api/v1/getDetail?taskId=10': {
        code: 200,
        data: {
            id: '10',
            title: '诗词课程',
            status: '进行中',
            number: '2137',
            type: '小学-语文',
            member: '刘老师',
        }
    },
    // 属性修改
    'post /nihao/api/v1/update/property': {
        success: true
    },
}