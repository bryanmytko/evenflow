class ObjectService {
  insertChildNode = (data, id, childNode) => {
    const iter = a => {
      if (a.id === id) {
        a.children ? a.children.push(childNode) : a.children = [childNode];
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    };

    iter(data);
  }

  replaceChildNode = (data, id, childNode) => {
    const iter = a => {
      if (a._id === id) return { ...a, ...childNode };
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return iter(data);
  }

  removeChildNode = (data, id) => {
    const iter = a => {
      if (a.children.length && a.children.some(c => c._id === id)){
        return { ...a, children: a.children.filter(c => c._id !== id) }
      }
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return iter(data);
  }
}

export default new ObjectService();
