/* eslint-disable no-unused-vars */

export default function Categories({ categories }) {
  
  console.log(" *******Recieved Categories from Backend ", categories);
  
  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>

      <div className="row px-xl-5 pb-3">
        {categories?.map((cat, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
            <a className="text-decoration-none" href="#">
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div
                  className="overflow-hidden"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img
                    className="img-fluid"
                    src={cat?.image?.secure_url}
                    alt={cat?.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-fill pl-3">
                  <h3>{cat.title}</h3>
                  <small className="text-body">{cat.title}</small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
