import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

export default function PaginationBtn({ pageCount, onPageChange, currentPage  }) {
    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1,
            },
        },
    };

    return(
        <motion.div 
            variants={paginationVariants} 
            initial="hidden" 
            animate="visible"
        >
            <ReactPaginate
                onPageChange={onPageChange}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                forcePage={currentPage}
                marginPagesDisplayed={1}

                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                    <span className="w-10 h-10 flex items-center justify-center bg-white rounded-md cursor-pointer">
                        <BsChevronRight />
                    </span>
                }
                previousLabel= {
                    <span className="w-10 h-10 flex items-center justify-center bg-white rounded-md mr-4 cursor-pointer">
                        <BsChevronLeft />
                    </span>
                }
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="block border- border-solid border-lightGray hover:bg-white w-10 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-red text-white"
            />
        </motion.div>
    );
};