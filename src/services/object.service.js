class ObjectService {
  insertChildNode = (data, id, childNode) => {
    const iter = (a) => {
      if (a.id === id) {
        a.children ? a.children.push(childNode) : a.children = [childNode];
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    }

    data.some(iter);
    return data;
  }
}

export default new ObjectService();
