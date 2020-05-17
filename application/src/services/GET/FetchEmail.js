/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2020-01-18 8:23:07 pm
 * @copyright GearStocks
 */

export const getEmail = async (email) => {
  const account = email.toLowerCase().trim();
  const URL = `https://api.github.com/users/${account}`;
  const res = await fetch(URL);
  return res.json();
};