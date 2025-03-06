const pool = require('../config/db');

class Incident {
  static async create(incidentData) {
    const { title, type, location, severity, description, affected_people, reported_by } = incidentData;
    const query = `
      INSERT INTO incidents (title, type, location, severity, description, affected_people, reported_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [title, type, location, severity, description, affected_people, reported_by];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT i.*, u.name as reporter_name 
      FROM incidents i 
      LEFT JOIN users u ON i.reported_by = u.id
      WHERE 1=1
    `;
    const values = [];
    let valueIndex = 1;

    if (filters.status) {
      query += ` AND i.status = $${valueIndex}`;
      values.push(filters.status);
      valueIndex++;
    }

    if (filters.type) {
      query += ` AND i.type = $${valueIndex}`;
      values.push(filters.type);
      valueIndex++;
    }

    query += ' ORDER BY i.created_at DESC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT i.*, u.name as reporter_name 
      FROM incidents i 
      LEFT JOIN users u ON i.reported_by = u.id 
      WHERE i.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const allowedUpdates = ['title', 'type', 'location', 'severity', 'description', 'affected_people', 'status'];
    const updates = Object.entries(updateData)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value], index) => `${key} = $${index + 2}`);
    
    if (updates.length === 0) return null;

    const query = `
      UPDATE incidents 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *;
    `;
    
    const values = [id, ...Object.values(updateData)];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Incident;