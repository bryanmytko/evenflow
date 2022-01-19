class ObjectService {
  insertChildNode = (data, id, childNode) => {
    const iter = a => {
      if (a.id === id) {
        a.children ? a.children.push(childNode) : a.children = [childNode];
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    };

    data.some(iter);
    return data;
  }

  replaceChildNode = (data, id, childNode) => {
    const iter = a => {
      if (a._id === id) {
        a = { ...a, ...childNode };
        return a
      }
      if(a.children.length) return { ...a, children: a.children.map(iter) }; //.some(iter);
    };

    return data.map(iter)[0];
  }
}

export default new ObjectService();
