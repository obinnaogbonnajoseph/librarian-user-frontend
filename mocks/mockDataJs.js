module.exports = function () {
    var data = {
        queryResult: {
            results: [
                { id: 1, name: "Things Fall Apart", author: "Chinua Achebe", libNumber: "BK_1", dateCreated: "2019-09-01 00:54:50.597", status: "BORROWED"},
                { id: 2, name: "Long Walk to Freedom", author: "Nelson Mandela", libNumber: "BK_2", dateCreated: "2019-09-02 00:54:50.597", status: "NOT_BORROWED"},
                { id: 1, name: "Cry, The Beloved Country", author: "Alan Paton", libNumber: "BK_3", dateCreated: "2019-09-03 00:54:50.597", status: "BORROWED"},
                { id: 1, name: "A Grain Of Wheat", author: "Ngugi Wa Thongo", libNumber: "BK_4", dateCreated: "2019-09-04 00:54:50.597", status: "NOT_BORROWED"},
                { id: 1, name: "So Long A Letter", author: "Mariama Ba", libNumber: "BK_5", dateCreated: "2019-09-05 00:54:50.597", status: "BORROWED"}

            ],
            offset: 0,
            total: 5,
            limit: 10
        },
        librarian_user: {
            userId: 1,
            username: "obinnaogbonna",
            firstName: "Obinna",
            lastName: "Ogbonna",
            dateCreated: "2019-09-01 00:54:50.597",
            status: "ACTIVE",
            roles: ['MODIFY_BOOKS', 'CREATE_BOOKS']

        },
        book_user: {
            userId: 2,
            username: "udochukwuonuoha",
            firstName: "Udochukwu",
            lastName: "Onuoha",
            dateCreated: "2019-09-01 00:54:50.597",
            status: "ACTIVE",
            roles: ['BORROW_BOOKS']
        }
    }

    return data
}