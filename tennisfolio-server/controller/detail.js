import * as repository from '../repository/detail.js';

export const getReview = async(req, res, next) => {
    const result = await repository.getReview();
    res.json(result);
}

/*
export const getDetailInfo = async(req, res, next) => {
    const result = await repository.getDetailInfo(req.params);
    res.json(result);    
}
*/
