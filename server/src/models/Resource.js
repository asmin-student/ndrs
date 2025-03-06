const pool = require('../config/db');

class Resource {
  static async create(resourceData) {
    const { name, type, quantity, unit, location, organization, contact_person } = resourceData;
    const query = `
      INSERT INTO resources (name, type, quantity, unit, location, organization, contact_person)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [name, type, quantity, unit, location, organization, contact_person];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, u.name as contact_name 
      FROM resources r 
      LEFT JOIN users u ON r.contact_person = u.id
      WHERE 1=1
    `;
    const values = [];
    let valueIndex = 1;

    if (filters.status) {
      query += ` AND r.status = $${valueIndex}`;
      values.push(filters.status);
      valueIndex++;
    }

    if (filters.type) {
      query += ` AND r.type = $${valueIndex}`;
      values.push(filters.type);
      valueIndex++;
    }

    query += ' ORDER BY r.created_at DESC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT r.*, u.name as contact_name 
      FROM resources r 
      LEFT JOIN users u ON r.contact_person = u.id 
      WHERE r.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const allowedUpdates = ['name', 'type', 'quantity', 'unit', 'location', 'status', 'organization'];
    const updates = Object.entries(updateData)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value], index) => `${key} = $${index + 2}`);
    
    if (updates.length === 0) return null;

    const query = `
      UPDATE resources 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *;
    `;
    
    const values = [id, ...Object.values(updateData)];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Resource;