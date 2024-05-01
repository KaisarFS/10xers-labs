const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const { query } = req.query;

      const whereClause = query ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
        ]
      } : {};

      const products = await Product.findAll({
        where: whereClause,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {});
      if(!product) throw { name: 'Data not found' };

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      if(!name) res.status(400).json({ message: 'Name is required' });
      if(!description) res.status(400).json({ message: 'Description is required' });
      if(!price) res.status(400).json({ message: 'Price is required' });
      if(!stock) res.status(400).json({ message: 'Stock is required' });

      const product = await Product.create({ name, description, price, stock });

      res.status(201).json({
        message: 'Product has been created',
        product
      })
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id }  = req.params;
      const product = await Product.findByPk(id);
      if(!product) throw { name: 'Data not found' };

      const { name, description, price, stock } = req.body;
      if(!name) throw { name: 'Name is required' };
      if(!description) throw { name: 'Description is required' };
      if(!price) throw { name: 'Price is required' };
      if(!stock) throw { name: 'Stock is required' };

      await Product.update({ name, description, price, stock }, { where: { id } }); 
      res.status(200).json({ 
        message: 'Product has been updated successfully',
        product: { id: +id, name, description, price, stock }
      });
      
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if(!product) throw { name: 'Data not found' };

      await Product.destroy({ where: { id } });
      res.status(200).json({ message: `${product.name} has been deleted` });

    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = ProductController;