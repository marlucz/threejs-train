import {
  AxesHelper,
  GridHelper
} from 'three';

function createAxesHelper() {
  const helper = new AxesHelper(100);
  return helper;
}

function createGridHelper() {
  const helper = new GridHelper(6);
  return helper;
}

export {
  createAxesHelper,
  createGridHelper
};