

class MyPageRenderer{

    getMyPage = async (req, res, next) => {
        // const adminValid = res.locals.a.adminValid;
        const adminValid = 0;
        
        if (adminValid == 0){
            return res.status(200).render("myPageIndex.ejs", {admin: 0, list: 0});
        } else if (adminValid == 1){
            return res.status(200).render("myPageIndex.ejs", {admin: 1, list: 0});
        } else {
            return res.status(200).render("관리자페이지.ejs");
        }
        
    }

    getMyPageUserMainProgress = async (req, res, next) => {
        // const adminValid = res.locals.a.adminValid;
        const adminValid = 0;
        if(adminValid == 0){
            return res.status(200).render("myPageIndex.ejs", {admin: 0, list: 1});
        }else{
            return res.status(200).send({msg: "잘못된 접근입니다"});
        }
    }
    
    getMyPageOwnerMainProgress = async (req, res, next) => {
        // const adminValid = res.locals.a.adminValid;
        const adminValid = 0;
        if(adminValid == 1){
            return res.status(200).render("myPageIndex.ejs", {admin: 1, list: 1});
        }else{
            return res.status(200).send({msg: "잘못된 접근입니다"});
        }
    }
}

module.exports = MyPageRenderer;