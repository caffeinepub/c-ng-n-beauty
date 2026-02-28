import List "mo:core/List";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Types
  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
  };

  type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    excerpt : Text;
    publishDate : Int;
    tags : [Text];
    imageUrl : Text;
    author : Text;
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : Int;
  };

  type OrderItem = {
    productId : Text;
    productName : Text;
    price : Float;
    quantity : Nat;
  };

  type Order = {
    id : Text;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    customerAddress : Text;
    items : [OrderItem];
    totalAmount : Float;
    status : Text; // "pending", "confirmed", "shipped", "delivered"
    createdAt : Int;
  };

  // Storage
  let products = Map.empty<Text, Product>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let contactMessages = Map.empty<Text, ContactMessage>();
  let orders = Map.empty<Text, Order>();

  // Products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = List.empty<Product>();
    for (product in products.values()) {
      if (Text.equal(product.category, category)) {
        filteredProducts.add(product);
      };
    };
    filteredProducts.toArray();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (products.containsKey(product.id)) {
      Runtime.trap("Product with id already exists");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product with id does not exist");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product with id does not exist");
    };
    products.remove(id);
  };

  // Blog Posts
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostById(id : Text) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public shared ({ caller }) func addBlogPost(post : BlogPost) : async () {
    if (blogPosts.containsKey(post.id)) {
      Runtime.trap("Post with id already exists");
    };
    blogPosts.add(post.id, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post with id does not exist");
    };
    blogPosts.remove(id);
  };

  // Contact Messages
  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async () {
    if (contactMessages.containsKey(message.id)) {
      Runtime.trap("Message with id already exists");
    };
    contactMessages.add(message.id, message);
  };

  // Orders
  public shared ({ caller }) func placeOrder(order : Order) : async () {
    if (orders.containsKey(order.id)) {
      Runtime.trap("Order with id already exists");
    };
    orders.add(order.id, order);
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orders.values().toArray();
  };

  public query ({ caller }) func getOrderById(id : Text) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : Text, status : Text) : async () {
    let validStatuses = ["pending", "confirmed", "shipped", "delivered"];
    let isValidStatus = validStatuses.find(func(s) { Text.equal(s, status) }) != null;

    if (not isValidStatus) {
      Runtime.trap("Invalid order status. Must be one of: pending, confirmed, shipped, delivered");
    };

    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(id, updatedOrder);
      };
    };
  };
};
