class ItemRenderer{
    getItemPage = async (req, res, next) => {

        return res.status(200).render("itemIndex.ejs", {list: 0});
    }

    getItemPageWithAnItem = async (req, res, next) => {
        const { itemId } = req.params;        

        return res.status(200).render("itemIndex.ejs", {list: 1, itemId});
    }
}

module.exports = ItemRenderer;