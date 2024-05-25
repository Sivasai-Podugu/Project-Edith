package com.projects.edith.repositories;

import com.projects.edith.models.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Integer> {
    boolean existsByUserIdAndContactUserId(Integer userId, Integer contactUserId);

    Page<Contact> findAllByUserId(Integer userId,Pageable pageable);
}
