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
      if (a._id === id) return { ...a, ...childNode };
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return [data].map(iter)[0];
  }

  removeChildNode = (data, id) => {
    const iter = a => {
      if (a.children.length && a.children.some(c => c._id === id)){
        return { ...a, children: a.children.filter(c => c._id !== id) }
      }
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return [data].map(iter)[0];
  }
}

export default new ObjectService();
